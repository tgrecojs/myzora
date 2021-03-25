import { compose } from "redux";
import { connect } from "react-redux";
import { fetchProvider } from "./withEthProvider/reducer";
import withEthProvider from "./withEthProvider/component";
import withLayout from "./withLayout/component";

const withPage = (Component) =>
  compose(
    connect(null, {
      onConnectProvider: fetchProvider,
    }),
    withEthProvider,
    withLayout
  )(Component);

export default withPage;
