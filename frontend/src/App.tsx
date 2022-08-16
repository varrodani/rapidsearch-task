import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {BaseLayout} from "./components/BaseLayout";
import { Typography } from 'antd';
const { Title } = Typography;

const App: React.FC = () => (
    <BaseLayout>
        <Title>RapidSearch introducing app</Title>
        <Title level={2}>Please choose from the menu items</Title>
    </BaseLayout>
);

export default App;