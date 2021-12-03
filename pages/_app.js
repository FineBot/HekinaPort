export default function Component({Component, pageProps}) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
        }

        .ReactTags__tagInput input {
          margin-bottom: 5px;
          border-radius: 10px;
          min-height: 30px;
          width: calc(100% - 30px);
          outline: none;
          padding: 5px 15px;
          font-size: 16px;
          font-weight: 400;
          min-width: 150px;

          border: 1px solid #dcdada;
          transition: all 200ms linear;
          background: #F6F7FA;
        }

        .ReactTags__selected {
          row-gap: 5px;
          column-gap: 5px;
          display: flex;
          flex-wrap: wrap;
          width: fit-content;
        }

        .ReactTags__tags {
          display: flex;
          column-gap: 5px;
        }

        .ReactTags__tag {
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          min-height: 30px;

          border-radius: 10px;
          outline: none;
          padding: 0px 15px;
          max-height: 40px;
          font-size: 16px;
          font-weight: 400;

          border: 1px solid #dcdada;
          transition: all 200ms linear;
          background: #F6F7FA;
        }

        .ReactTags__remove {
          background-color: transparent;
          border: 1px #CC2872 solid;
          border-radius: 5px;
          color: #CC2872;
          outline: none;
          margin-left: 10px;
        }

        .ReactTags__suggestions {
          position: absolute;
          z-index: 15;
        }

        .ReactTags__suggestions ul {
          list-style-type: none;
          box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);
          background: white;
          border-radius: 7px;
          width: 200px;
        }

        .ReactTags__suggestions li {
          border-bottom: 1px solid #ddd;
          padding: 5px 10px;
          margin: 0;
          margin-left: -40px;
        }

        .ReactTags__suggestions li mark {
          background: none;
        }

        .ReactTags__suggestions ul li.ReactTags__activeSuggestion {
          background: #b7cfe0;
          border-radius: 5px;
          cursor: pointer;
        }

        @font-face {
          font-family: "MoscowSans";
          src: url("/static/fonts/MoscowSans/moscowsansregular.ttf");
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

