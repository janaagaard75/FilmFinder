import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { SelectableDate } from "../model/SelectableDate"

interface Props {
  date: SelectableDate
  toggleDateSelection: () => void
}

@observer
export class DateItem extends Component<Props, void> {
  public render() {
    const cssClasses = classNames(
      // TODO: Remove col-1-of-7 since it's no longer used.
      "clickable",
      {
        "selected-item": this.props.date.selected
      }
    )

    return (
      <div className={cssClasses} onClick={this.props.toggleDateSelection}>
        {this.props.date.label}
      </div>
    )
  }
}