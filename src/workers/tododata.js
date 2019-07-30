export default () => {
  onmessage = function (e) {
    switch (e.data[0]) {
      case 'PARSE_TODOS': {
        postMessage(['PARSED_TODOS', JSON.parse(e.data[1])]);
        break;
      }
      case 'STRINGIFY_TODOS': {
        postMessage(['STRINGIFIED_TODOS', JSON.stringify(e.data[1])]);
        break;
      }
      default: {
        break;
      }
    }
  };
}
