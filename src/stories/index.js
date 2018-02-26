import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Message from '../components/Message';
import Messages from '../components/Messages';
import seedData from '../data/messages.json';

const readMsg = { subject: "Some cool, marked as read message", read: true };
const unreadMsg = { subject: "Some cool, not-yet-read message", read: false };
const selectedMsg = { subject: "Has a check", selected: true };
const unselectedMsg = { subject: "No check mark", selected: false };
const starredMsg = { subject: "Beautiful Star", starred: true };
const unstarredMsg = { subject: "Starless", starred: false };
const readAndSelMsg = { subject: "Yellow BG, Plain Font", read: true, selected: true };
const msgWithLabels = { subject: "I have labels", labels: ["label 1", "label 2"] };

storiesOf('Message', module)
  .add('Read message has read style', () => <Message message={readMsg}/>)
  .add('Unread message has unread style', () => <Message message={unreadMsg}/>)
  .add("Read AND selected message has read font and selected bg", () => <Message message={readAndSelMsg} />)
  .add('Selected message has check', () => <Message message={selectedMsg}/>)
  .add('Unselected message has no check', () => <Message message={unselectedMsg}/>)
  .add('Starry message has star', () => <Message message={starredMsg}/>)
  .add('Unstarred: no star', () => <Message message={unstarredMsg}/>)
  .add('Labels show up', () => <Message message={msgWithLabels} />)

storiesOf('Messages', module)
  .add('Renders Message components', () => <Messages messages={seedData}/>)
  