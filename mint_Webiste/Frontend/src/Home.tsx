import { Navbar, Capsules, Footer, Droprate } from "./components";
import styles from "./styles/style";

function Home() {
	return (
		<div className="flex-grow">
			<div className={`bg-capsule ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Capsules />
					{/* <Droprate /> */}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;