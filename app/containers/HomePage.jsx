import React from 'react';
import List from './List.jsx';
import '../assets/css/window.css';
import '../assets/css/sidebar.css';
import SplitPane from 'react-split-pane';

const Sidebar = () =>
  <div className="sidebar-left">
    <ul className="menu">
      <li>
        <span className="group">Library</span>
        <ul>
          <li className="active"><span className="name">All Fonts</span></li>
          <li><span className="name">Recents</span></li>
          <li><span className="name">Starred</span></li>
          <li><span className="name">Glyps</span></li>
        </ul>
      </li>
      <li>
        <span>Collections</span>
        <ul>
          <li><span className="name">Fixed Width</span></li>
          <li><span className="name">Fun</span></li>
          <li><span className="name">Modern</span></li>
          <li><span className="name">PDF</span></li>
          <li><span className="name">Traditional</span></li>
          <li><span className="name">Web</span></li>
        </ul>
      </li>
    </ul>
  </div>

const Body = () =>
  <div className="main-content">
    <List />
  </div>

export default function HomePage () {
  return (
    <main className="window">
      <SplitPane split="vertical" minSize={180}>
        <Sidebar />
        <Body />
      </SplitPane>
      <footer></footer>
    </main>
  );
}
