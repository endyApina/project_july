import React from 'react' 
import { TextContainer, SmallText } from "./styles";

const LabelComponent = ({name}) => {
  return (
    <TextContainer> 
      <SmallText>
        {name}
      </SmallText>
    </TextContainer>
  )
}

export default React.memo(LabelComponent)