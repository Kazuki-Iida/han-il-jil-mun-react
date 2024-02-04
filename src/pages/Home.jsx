import HomeRanking from './components/HomeRanking';
import HomeIndex from './components/HomeIndex';
import Header from './components/Header';

const Home = () => {
	return (
		<>
			<Header />
			<div className="container">
				<div className="home-container">
					<div>
						<HomeIndex />
					</div>
					<div>
						<HomeRanking />
					</div>
				</div>
			</div>
    </>
  )
}

export default Home;