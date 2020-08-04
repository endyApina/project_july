import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ViewContainer } from './loader.styles';

const Loader = ()=> (
	<ViewContainer>
		<ActivityIndicator size="large" color="blue" />
	</ViewContainer>
);

export default Loader;
