import * as React from 'react';
import { render } from 'react-dom';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

interface Iprops {
  children: string;
}
function App(props: Iprops) {
  return (
    <>
      <h1>{props.children}</h1>
      <DatePicker />
    </>
  );
}

render(<App>hello TypeScript!</App>, document.getElementById('root'));
