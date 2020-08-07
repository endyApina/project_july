import React, {useState, Component} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import Landing from '../Landing/index';
// import {Slides} from './slides';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1, 
        // paddingTop: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20
    }, 

    title: {
        fontSize: 26, 
        color: '#fcba03', 
        fontWeight: 'bold',
        textAlign: 'center', 
        marginTop: 20, 
    }, 

    text: {
        color: '#fff', 
        fontSize: 20, 
        marginTop: -90,
        fontWeight: 'bold',
        marginLeft:  120,
    }, 

    image: {
        marginTop: -100,
        width: 350, 
        height: 300, 
        resizeMode: 'contain',
        marginLeft: -120,
    }, 
    backgroundImage: {
        marginTop: 250,
        marginLeft: 120,
        height: '60%',
        width: '70%',
        resizeMode: 'contain'
    }
})
const Slides = [
    {
      key: 's1',
      text: 'Find Vendors',
      title: 'Mobile Recharge',
      image: require('../../../assets/man-glass.png'),
      backgroundColor: '#1760ff',
      backgroundImage: require('../../../assets/map-icon.png')
    },
    {
      key: 's2',
      title: 'Flight Booking',
      text: 'Upto 25% off on Domestic Flights',
      image: require('../../../assets/man-glass.svg'),
      backgroundColor: '#febe29',
      backgroundImage: require('../../../assets/naira.png')
    },
    {
      key: 's3',
      title: 'Great Offers',
      text: 'Enjoy Great offers on our all services',
      image: require('../../../assets/man-glass.svg'),
      backgroundColor: '#22bcb5',
    },
  ];

class AppSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showRealApp: false
        };
    }

    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
              <Icon
                name="md-arrow-round-forward"
                color="rgba(255, 255, 255, .9)"
                size={24}
              />
            </View>
        );
    }
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
              <Icon
                name="md-checkmark"
                color="rgba(255, 255, 255, .9)"
                size={24}
              />
            </View>
        );
    }
    _onDone = () => {
        this.setState({showRealApp: true})
    }
    _onSkip = () => {
        this.setState({showRealApp: true})
    }
    _renderItem = ({item}) => {
        const {mainColor, defaltColor, sliderOneBackgroundColor } = this.props.appSettings;
        return (
            <View style={{backgroundColor: sliderOneBackgroundColor}} >
                <ImageBackground
                    source={item.backgroundImage}
                    style={styles.backgroundImage}
                >
                    <Image style={styles.image} source={item.image} />
                </ImageBackground>
                
                <Text style={styles.text} >{item.text}</Text>
            </View>
        );
    };

    render() {
    const {mainColor, defaltColor, sliderOneBackgroundColor } = this.props.appSettings;
        if (this.state.showRealApp) {
            return (
                <Landing />
            )
        } else {
            return (
                <AppIntroSlider 
                data={Slides}
                style={{backgroundColor: sliderOneBackgroundColor}}
                renderItem={this._renderItem}
                onDone={this._onDone}
                showSkipButton={true}
                onSkip={this._onSkip}
                showDoneButton={true}
                showNextButton={true}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
            />
            )
        }
    }

}

// const AppSlider = ({navigation, appSetting}) => {
//     const [setAppMode, showMainApp] = useState(false)

//     const onDoneAllSlides = () => {
//         setAppMode(true)
//     }

//     const onSkipSlides = () => {
//         setAppMode(false)
//     }

//     const navigateToMainApp = () => {
//         navigation.push('Landing')
//     }

//     if (!showMainApp) {
//         return (
//             <Landing />
//         )
//     } else {
//         return (
//             <AppIntroSlider 
//                 data={Slides}
//                 onDone={onDoneAllSlides}
//                 showSkipButton={true}
//                 onSkip={onSkipSlides}
//             />
//         )
//     }
// }

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
});

export default connect(mapStateToProps)(AppSlider);