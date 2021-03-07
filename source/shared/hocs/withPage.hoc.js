import { compose } from "redux";
import { connect } from "react-redux";
import { setEthProvider, setEthProviderError } from "./withEthProvider/reducer";
import withEthProvider from "./withEthProvider/component";
import withLayout from "./withLayout/component";

const withPage = (Component) =>
  compose(
    connect(null, {
      setEthProvider,
      setEthProviderError,
    }),
    withEthProvider,
    withLayout
  )(Component);

export default withPage;
