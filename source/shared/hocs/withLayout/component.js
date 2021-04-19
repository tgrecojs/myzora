import { Component } from 'react'
import { Global, css } from '@emotion/react'

const PageWrapper = (Page) => {
  return class extends Component {
    static getInitialProps(ctx) {
      if (Page.getInitialProps) return Page.getInitialProps(ctx)
    }
    render() {
      return (
        <div className="wrapper">
          <Global
            styles={css`
              @import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');
              body {
                margin: 0;
                font-size: 16px;
                font-family: 'Lora';
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
          <div className="content">
            <Page {...this.props} />
          </div>
        </div>
      )
    }
  }
}

export default PageWrapper
