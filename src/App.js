import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import UserContext from './contexts/UserContext';

import GlobalStyle from './styles/GlobalStyle';

import Routes from './Routes';
import FollowsContext from './contexts/FollowsContext';
import { getFollows } from './service/service.users';

function App() {
	const [userInfo, setUserInfo] = useState('');
	const [peopleIFollow, setPeopleIFollow] = useState([]);

	const infoFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
	useEffect(() => {
		if (infoFromLocalStorage) setUserInfo(infoFromLocalStorage);
		if(userInfo.token){
			getFollows(userInfo.token).then((res)=>{
				setPeopleIFollow(res.data.users);
			}).catch();
		}
	}, [peopleIFollow]);


	return (
		<UserContext.Provider value={{userInfo, setUserInfo}}>
			<FollowsContext.Provider value={{peopleIFollow, setPeopleIFollow}}>
				<Router>
					<GlobalStyle/>
					<AnimatePresence exitBeforeEnter initial={false}>
						<Routes/>
					</AnimatePresence>
				</Router>
			</FollowsContext.Provider>
		</UserContext.Provider>
	);
}

export default App;