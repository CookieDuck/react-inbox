import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Message from '../components/Message';
import Messages from '../components/Messages';
import Toolbar from '../components/Toolbar';
import App from '../components/App';
import seedData from '../data/messages.json';

var idGen = 1;
const readMsg = { id: idGen++, subject: "Some cool, marked as read message", read: true };
const unreadMsg = { id: idGen++, subject: "Some cool, not-yet-read message", read: false };
const selectedMsg = { id: idGen++, subject: "Has a check", selected: true };
const unselectedMsg = { id: idGen++, subject: "No check mark", selected: false };
const starredMsg = { id: idGen++, subject: "Beautiful Star", starred: true };
const unstarredMsg = { id: idGen++, subject: "Starless", starred: false };
const readAndSelMsg = { id: idGen++, subject: "Yellow BG, Plain Font", read: true, selected: true };
const msgWithLabels = { id: idGen++, subject: "I have labels", labels: ["label 1", "label 2"] };

storiesOf('Message', module)
  .add('Read message has read style', () => <Message message={readMsg }/>)
  .add('Unread message has unread style', () => <Message message={unreadMsg} />)
  .add("Read AND selected message has read font and selected bg", () => <Message message={readAndSelMsg} />)
  .add('Selected message has check', () => <Message message={selectedMsg} />)
  .add('Unselected message has no check', () => <Message message={unselectedMsg} />)
  .add('Starry message has star', () => <Message message={starredMsg} />)
  .add('Unstarred: no star', () => <Message message={unstarredMsg} />)
  .add('Labels show up', () => <Message message={msgWithLabels} />)

storiesOf('Messages', module)
  .add('Renders Message components', () => <Messages messages={seedData} actionHandler={action('Click')} />)

storiesOf('Toolbar', module)
  .add('Renders unread message count', () => <Toolbar messages={[readMsg, unreadMsg]} />)
  .add('No messages selected: unchecked box, disabled buttons', () => <Toolbar messages={[unselectedMsg]}/>)
  .add('Some (but not all) selected: minus box, enabled buttons', () => <Toolbar messages={[unselectedMsg, selectedMsg]} />)
  .add('All messages selected: checked box, enabled buttons', () => <Toolbar messages={[selectedMsg]}/>)
  
storiesOf('App', module)
  .add('Clicking checkbox toggles selected state', () => <App messages={[unreadMsg, readMsg, readAndSelMsg, unstarredMsg, starredMsg]} />)
  .add('Clicking star toggles starred state', () => <App messages={[unstarredMsg, starredMsg]} />)
