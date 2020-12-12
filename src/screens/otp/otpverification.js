import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { GenericStyles } from '../../components/utility/styles/GenericStyles';
import CustomScreenContainer from '../../components/forms/custom-screen-container/custom-screen-container';
import CustomText from './custom-forms/custom-text';
import CustomTextHeader from './custom-forms/custom-text-header';
import CustomTextInput from '../../components/forms/cutom-otp-input/custom-input';
import CustomTextButton from '../../components/forms/custom-button/custom-button.component';
import CustomButton from './custom-forms/custom-button';
import ErrorBoundary from '../../components/utility/errorBoundry'; 
import colors from '../../components/utility/styles/colors';
import { isIOS, logErrorWithMessage } from '../../components/utility/helperFunctions';
import TimerText from './timerText';
import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectSignUpData } from '../../redux/user/user.selector';

import { otpVerificationStart, startForgetPassword, startOTPVerification } from '../../redux/user/user.action';

const RESEND_OTP_TIME_LIMIT = 2; 
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; 

let resendOtpTimerInterval; 
let autoSubmitOtpTimerInterval; 

const OtpVerification = ({otpVerificationStart, signUpData, otpRequestData, attempts, sendOTPToken}) => {

    const navigation = useNavigation();

    const [attemptsRemaining, setAttemptsRemaining] = useState(attempts);
    const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']); 
    const [submittingOtp, setSubmittingOtp] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');
    const [userPhoneNumber, setPhoneNumber] = useState('');

    // in secs, if value is greater than 0 then button will be disabled
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT,
    );

    // 0 < autoSubmitOtpTime < 4 to show auto submitting OTP text
    const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(
        AUTO_SUBMIT_OTP_TIME_LIMIT,
    );

    // TextInput refs to focus programmatically while entering OTP
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixthTextInputRef = useRef(null);

    // a reference to autoSubmitOtpTimerIntervalCallback to always get updated value of autoSubmitOtpTime
    const autoSubmitOtpTimerIntervalCallbackReference = useRef();

    useEffect(() => {
        // autoSubmitOtpTime value will be set after otp is detected,
        // in that case we have to start auto submit timer
        autoSubmitOtpTimerIntervalCallbackReference.current = autoSubmitOtpTimerIntervalCallback;
    });

    useEffect(() => {
      setPhoneNumber(signUpData.phoneNumber)
    })

    useEffect(() => {
        startResendOtpTimer();

        return () => {
            if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);
    
    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
          clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
          if (resendButtonDisabledTime <= 0) {
            clearInterval(resendOtpTimerInterval);
          } else {
            setResendButtonDisabledTime(resendButtonDisabledTime - 1);
          }
        }, 1000);
      };
    
      // this callback is being invoked from startAutoSubmitOtpTimer which itself is being invoked from useEffect
      // since useEffect use closure to cache variables data, we will not be able to get updated autoSubmitOtpTime value
      // as a solution we are using useRef by keeping its value always updated inside useEffect(componentDidUpdate)
      const autoSubmitOtpTimerIntervalCallback = () => {
        if (autoSubmitOtpTime <= 0) {
          clearInterval(autoSubmitOtpTimerInterval);
    
          // submit OTP
          onSubmitButtonPress();
        }
        setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
      };
    
      const startAutoSubmitOtpTimer = () => {
        if (autoSubmitOtpTimerInterval) {
          clearInterval(autoSubmitOtpTimerInterval);
        }
        autoSubmitOtpTimerInterval = setInterval(() => {
          autoSubmitOtpTimerIntervalCallbackReference.current();
        }, 1000);
      };
    
      const refCallback = textInputRef => node => {
        textInputRef.current = node;
      };

      // setPhoneNumber(signUpData.phoneNumber)
    
      const onResendOtpButtonPress = () => {
        // clear last OTP
        if (firstTextInputRef) {
          setOtpArray(['', '', '', '', '', '']);
          firstTextInputRef.current.focus();
        }
    
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();
    
        // resend OTP Api call
        console.log("About to get current user")
        console.log(signUpData)
        console.log(signUpData.phoneNumber)

        // const user = AsyncStorage.getItem("login_data")
        // const localStorageData = JSON.parse(user)
        // console.log(localStorageData)
        // otpVerificationStart(signUpData.phoneNumber)
        // todo
        console.log('todo: Resend OTP');
      };
    
      const onSubmitButtonPress = () => {
        // API call
        // todo
        console.log('todo: Submit OTP');
        console.log(otpArray)
        let verificationCode = "";
        if (Array.isArray(otpArray)) {
          otpArray.forEach(data => {
            verificationCode = verificationCode + data
          });
        }
        console.log(verificationCode)
        var data = {
          phoneNumber: userPhoneNumber, 
          token: verificationCode, 
          actionType: "activate_account"
        }
        console.log(data)
        // navigateToIntro();
        sendOTPToken(data)
      };

    const navigateToIntro = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'AppSlider' }]
        })
    }
    
    //   // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
    //   // using onOtpKeyPress for this purpose
      const onOtpChange = index => {
        //   return
        return value => {
            if (isNaN(Number(value))) {
                // do nothing when a non digit is pressed
                return;
            }
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index] = value;
            setOtpArray(otpArrayCopy);
        
            // auto focus to next InputText if value is not blank
            if (value !== '') {
                if (index === 0) {
                secondTextInputRef.current.focus();
                } else if (index === 1) {
                thirdTextInputRef.current.focus();
                } else if (index === 2) {
                fourthTextInputRef.current.focus();
                } else if (index === 3) {
                fifthTextInputRef.current.focus(); 
                } else if (index === 4) {
                sixthTextInputRef.current.focus(); 
                } else if (index === 5) {
                  otpArray[index] = value;
                // navigateToIntro()
                  console.log(otpArray)
                }
            }
        };
      };
    
      // only backspace key press event is fired on Android
      // to have consistency, using this event just to detect backspace key press and
      // onOtpChange for other digits press
      const onOtpKeyPress = index => {
        //   return
            return ({nativeEvent: {key: value}}) => {
            // auto focus to previous InputText if value is blank and existing value is also blank
            if (value === 'Backspace' && otpArray[index] === '') {
                if (index === 1) {
                firstTextInputRef.current.focus();
                } else if (index === 2) {
                secondTextInputRef.current.focus();
                } else if (index === 3) {
                thirdTextInputRef.current.focus();
                } else if (index === 4) {
                fourthTextInputRef.current.focus();
                } else if (index === 5) {
                fifthTextInputRef.current.focus();
                } else if (index === 6) {
                sixthTextInputRef.current.focus();
                }
        
                /**
                 * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
                 * doing this thing for us
                 * todo check this behaviour on ios
                 */
                if (isIOS && index > 0) {
                const otpArrayCopy = otpArray.concat();
                otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
                setOtpArray(otpArrayCopy);
                }
            }
            };
      };
    
      return (
        <CustomScreenContainer>
          {/* <NavigationHeader
            title={'Go back'}
            leftIconAction={() => {}}
            leftIconType={'back'}
            containerStyle={GenericStyles.navigationHeaderBorder}
          /> */}
          <ErrorBoundary screenName={'OtpVerification'}>
            <View style={styles.container}>
                <CustomTextHeader>
                    Verification
                </CustomTextHeader>
              <CustomText>
                Hey! We sent a One-Time-Password to your registration {' '}
                {otpRequestData.email_id ? 'email' : 'mobile number'}{'. '}
                Kindly enter it below. 
              </CustomText>
              <View style={[GenericStyles.row, GenericStyles.mt12]}>
                {[
                  firstTextInputRef,
                  secondTextInputRef,
                  thirdTextInputRef,
                  fourthTextInputRef,
                  fifthTextInputRef, 
                  sixthTextInputRef,
                ].map((textInputRef, index) => (
                  <CustomTextInput
                    containerStyle={[GenericStyles.fill, GenericStyles.mr12]}
                    value={otpArray[index]}
                    onKeyPress={onOtpKeyPress(index)}
                    onChangeText={onOtpChange(index)}
                    keyboardType={'numeric'}
                    maxLength={1}
                    style={[styles.otpText, GenericStyles.centerAlignedText]}
                    autoFocus={index === 0 ? true : undefined}
                    refCallback={refCallback(textInputRef)}
                    key={index}
                  />
                ))}
              </View>
              {errorMessage ? (
                <CustomText
                  style={[
                    GenericStyles.negativeText,
                    GenericStyles.mt12,
                    GenericStyles.centerAlignedText,
                  ]}>
                  {errorMessage}
                </CustomText>
              ) : null}
              {resendButtonDisabledTime > 0 ? (
                <TimerText text={'Resend OTP in'} time={resendButtonDisabledTime} />
              ) : (
                <CustomButton
                  type={'link'}
                  text={'Resend OTP'}
                  buttonStyle={styles.otpResendButton}
                  textStyle={styles.otpResendButtonText}
                  onPress={onResendOtpButtonPress}
                />
              )}
              <View style={GenericStyles.fill} />
              {submittingOtp && <ActivityIndicator />}
              {autoSubmitOtpTime > 0 &&
              autoSubmitOtpTime < AUTO_SUBMIT_OTP_TIME_LIMIT ? (
                <TimerText text={'Submitting OTP in'} time={autoSubmitOtpTime} />
              ) : null}
              <CustomText
                style={[GenericStyles.centerAlignedText, GenericStyles.mt12]}>
                {attemptsRemaining || 0} Attempts remaining
              </CustomText>
              <CustomButton
                type={'fill'}
                text={'Submit'} 
                textStyle={styles.submitButtonText}
                buttonStyle={GenericStyles.otpButton}
                onPress={onSubmitButtonPress}
                disabled={submittingOtp}
              />
            </View>
          </ErrorBoundary>
        </CustomScreenContainer>
      );
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
    },
    submitButtonText: {
      color: colors.WHITE,
    },
    otpResendButton: {
      alignItems: 'center',
      width: '100%',
      marginTop: 16,
    },
    otpResendButtonText: {
      color: colors.ORANGE,
      textTransform: 'none',
      textDecorationLine: 'underline',
    },
    otpText: {
      width: '100%',
    },
});
  
OtpVerification.defaultProps = {
    attempts: 5,
    otpRequestData: {
      username: 'varunon9',
      email_id: false,
      phone_no: true,
    },
};
  
OtpVerification.propTypes = {
    otpRequestData: PropTypes.object.isRequired,
    attempts: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector ({
  appSettings: selectAppSettings, 
  currentUser: selectCurrentUser, 
  signUpData: selectSignUpData, 
})

const mapDispatchToProps = dispath => ({
  otpVerificationStart: phoneNumber => dispath(otpVerificationStart(phoneNumber)),
  startForgetPassword: phoneNumber => dispath(startForgetPassword(phoneNumber)), 
  sendOTPToken: verificationData => dispath(startOTPVerification(verificationData)),
})
  
export default connect(mapStateToProps, mapDispatchToProps)(OtpVerification);