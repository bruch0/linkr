import React from 'react';
import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';

import UserContext from './contexts/UserContext';

import GlobalStyle from './styles/GlobalStyle';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Timeline from './pages/Timeline';
import MyPosts from './pages/MyPosts';
import SomeonesPosts from './pages/SomeonesPosts';
import Hashtag from './pages/Hashtag';
import MyLikes from './pages/MyLikes';

function App() {
	const infoFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
	const [userInfo, setUserInfo] = useState('');
	useEffect(() => {
		if (infoFromLocalStorage) setUserInfo(infoFromLocalStorage);
	}, []);


	return (
		<UserContext.Provider value={{userInfo, setUserInfo}}>
			<Router>
				<GlobalStyle/>
				<Switch>
					<Route path="/" exact> 
						{userInfo.token ? <Redirect to="/timeline" /> : <SignIn />}
					</Route>
					<Route path="/sign-up" exact component={SignUp} />
					<Route path="/timeline" exact>
						{userInfo.token ? <Timeline /> : <Redirect to="/" />}
					</Route>
					<Route path="/my-posts" exact >
						{userInfo.token ? <MyPosts /> : <Redirect to="/" />}
					</Route>
					<Route path="/user/:id" exact component={SomeonesPosts}/>
					<Route path="/hashtag/:hashtag" exact component={Hashtag} />
					<Route path="/my-likes" exact component={MyLikes} />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
