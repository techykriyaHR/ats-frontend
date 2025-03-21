import FixingBugs from '../assets/fixing-bugs.svg';

const Dashboard = () => {
    return (
        <div className="p-6 text-center text-lg font-semibold">
            <img src={FixingBugs} alt="Fixing Bugs" className="max-w-md mx-auto" />
        </div>
    );
}

export default Dashboard;
