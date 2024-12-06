import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';
import { callShowEvent, callHideEvent } from './registerEvent';

function ContextMenuTrigger({
  children,
  id,
  disableWhileShiftPressed = false,
  attributes = {},
  disable = false,
  className = ''
}) {
  const menuTrigger = useRef(null);

  const handleContextMenu = useCallback(e => {
    if (disable) return;
    if (disableWhileShiftPressed && e.nativeEvent.shiftKey) {
      callHideEvent(id);
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    const { clientX, clientY } = e.nativeEvent;
    const opts = {
      position: {
        clientY,
        clientX
      },
      id
    };

    callShowEvent(opts);
  });

  return (
    <div
      className={classnames('menu-trigger', ...className.split(' '))}
      ref={menuTrigger}
      {...attributes}
      onContextMenu={e => handleContextMenu(e)}
    >
      {children}
    </div>
  );
}

export default ContextMenuTrigger;
