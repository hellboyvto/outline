// @flow
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../DocumentEdit.scss';
const cx = classNames.bind(styles);

type Props = {
  children?: ?React.Element<any>,
  onScroll?: Function,
  scrollTop?: ?number,
  fullWidth?: ?boolean,
};

class EditorPane extends Component {
  props: Props;
  pane: HTMLElement;
  content: HTMLElement;

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.scrollTop) {
      this.scrollToPosition(nextProps.scrollTop);
    }
  };

  componentDidMount = () => {
    this.pane.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount = () => {
    this.pane.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = (e: Event) => {
    setTimeout(() => {
      this.props.onScroll &&
        this.props.onScroll(this.pane.scrollTop / this.content.offsetHeight);
    }, 50);
  };

  scrollToPosition = (percentage: number) => {
    // Push to edges
    if (percentage < 0.02) percentage = 0;
    if (percentage > 0.99) percentage = 100;

    this.pane.scrollTop = percentage * this.content.offsetHeight;
  };

  setPaneRef = (ref: HTMLElement) => {
    this.pane = ref;
  };

  setContentRef = (ref: HTMLElement) => {
    this.content = ref;
  };

  render() {
    return (
      <div
        className={cx(styles.editorPane, { fullWidth: this.props.fullWidth })}
        ref={this.setPaneRef}
      >
        <div ref={this.setContentRef} className={styles.paneContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default EditorPane;