import { Global, css } from "@emotion/react";

const Wrapper = (Component) => (props) => (
  <div className="wrapper">
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Lora&display=swap");
        body {
          margin: 0;
          font-size: 16px;
          font-family: "Lora";
        }
        .wrapper {
          display: flex;
          min-height: 100vh;
          flex-direction: column;
        }
        .content {
          flex: 1;
        }
      `}
    />
    <Component>
      <div className="content">{props}</div>
    </Component>
  </div>
);

export default Wrapper;
