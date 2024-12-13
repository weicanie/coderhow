import { useNavigate } from 'react-router';

function useNavigator(path) {
	const navigate = useNavigate();
	return pathInput => {
		if (pathInput) {
			navigate(pathInput);
		} else {
			navigate(path);
		}
	};
}

export default useNavigator;
