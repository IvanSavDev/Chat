import React from 'react';

const ListMessages = React.forwardRef(({
  idsMessages, messages, currentChannelId,
}, ref) => (
  <div
    className=" h-100 d-flex flex-column-reverse overflow-auto px-3 pb-2 border"
    ref={ref}
  >
    {[...idsMessages].reverse().map((idMessage) => {
      const currentMessage = messages[idMessage];
      if (currentMessage.channelId !== currentChannelId) {
        return '';
      }
      return (
        <div key={idMessage} className="pt-2 text-break">
          <span>
            <strong>{`${currentMessage.username}: `}</strong>
          </span>
          <span>{currentMessage.body}</span>
        </div>
      );
    })}
  </div>
));

export default ListMessages;
