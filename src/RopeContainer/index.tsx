import React, { useCallback, useState, useEffect } from 'react';
import { Tooltip, Popconfirm } from 'antd';
import { ModalConfirm, type ModalConfirmProps } from './ModalConfirm';
import { isString } from 'lodash';
import { isPromise } from '../_util';

export * from './ModalConfirm';

export interface RopeContainerProps {
  /** Tooltip的title，推荐string类型 */
  tooltip?: string;
  /** PopConfirm的title，推荐string类型 */
  confirm?: string;
  /** Modal弹框确认 */
  modalConfirm?: string | ModalConfirmProps;
  /** 是否禁用 */
  disabled?: (() => boolean) | boolean;
  /** 是否渲染 */
  render?: (() => boolean) | boolean;
  /** 点击事件 */
  onClick: (...args: any[]) => any;
  /** 渲染容器 */
  container?: (() => React.ReactElement) | React.ReactElement;
  children: React.ReactElement;

  /** 内部组件使用，status变化时的回调 */
  onStatusChange?: (status: { loading: boolean; tooltipVisible: boolean; popconfirmVisible: boolean }) => void;
}

export const RopeContainer: React.FC<RopeContainerProps> = (props) => {
  const {
    disabled: propDisabled,
    tooltip,
    confirm,
    modalConfirm,
    onClick,
    children,
    render,
    container,
    onStatusChange,
  } = props;

  const [loading, setLoading] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [popconfirmVisible, setPopconfirmVisible] = useState(false);

  const disabled = typeof propDisabled === 'function' ? propDisabled() : propDisabled;

  useEffect(() => {
    onStatusChange?.({
      loading,
      tooltipVisible,
      popconfirmVisible,
    });
  }, [loading, tooltipVisible, popconfirmVisible]);

  const onClickInternal = (...args: any[]) => {
    if (loading) return;

    setLoading(true);
    const result = onClick(...args);

    if (isPromise(result)) {
      (result as unknown as Promise<any>)
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const renderTriggerElement = () => {
    if (disabled) {
      return React.cloneElement(children, { disabled, loading });
    }
    if (confirm) {
      return React.cloneElement(children, { loading });
    }
    return React.cloneElement(children, { onClick: onClickInternal, loading });
  };

  const onToolVisibleChange = useCallback(
    (visible) => {
      setTooltipVisible(popconfirmVisible ? false : visible);
    },
    [popconfirmVisible]
  );

  const onPopconfirmVisibleChange = useCallback(
    (visible) => {
      if (loading) return;
      setTooltipVisible(false);
      setPopconfirmVisible(visible);
    },
    [loading]
  );

  if (typeof render === 'function' && !render()) return null;
  if (!render) return null;

  const renderTooltipElement = (element: React.ReactElement) => {
    return React.createElement(
      Tooltip,
      {
        title: tooltip,
        open: tooltipVisible,
        onOpenChange: onToolVisibleChange,
      },
      element
    );
  };

  const renderPopconfirmElement = (element: React.ReactElement) => {
    if (disabled || !confirm) {
      return element;
    }

    return React.createElement(
      Popconfirm,
      {
        title: confirm,
        onConfirm: onClickInternal,
        open: popconfirmVisible,
        onOpenChange: onPopconfirmVisibleChange,
      },
      element
    );
  };

  const renderModalConfirmElement = (element: React.ReactElement) => {
    if (disabled || !modalConfirm) {
      return element;
    }

    return React.createElement(
      ModalConfirm,
      {
        ...(isString(modalConfirm) ? { content: modalConfirm } : modalConfirm),
        onOk: onClickInternal,
      },
      element
    );
  };

  const renderContainerElement = (element: React.ReactElement) => {
    if (!container) return element;

    if (React.isValidElement(container)) {
      return React.cloneElement(container, {}, element);
    }

    if (typeof container === 'function') {
      const containerEle = container();
      return React.cloneElement(containerEle, {}, element);
    }

    return element;
  };

  let ele = renderTriggerElement();
  ele = renderTooltipElement(ele);
  ele = renderPopconfirmElement(ele);
  ele = renderModalConfirmElement(ele);
  ele = renderContainerElement(ele);

  return ele;
};

RopeContainer.defaultProps = {
  render: true,
};
