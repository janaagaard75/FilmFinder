import * as React from "react"
import { ChangeEvent } from "react"
import { Component } from "react"

import { TimeInterval } from "../model/filters/TimeInterval"
import { integerArray } from "../utilities";

interface Props {
  startInterval: TimeInterval
}

export class TimePicker extends Component<Props, void> {
  private handleChangeFrom(formEvent: ChangeEvent<HTMLSelectElement>) {
    // TODO: Consider trying to be smart about the value of 'to' when 'from' is updated, and vice versa.
    this.props.startInterval.from = parseInt(formEvent.currentTarget.value, 10)
  }

  private handleChangeTo(formEvent: ChangeEvent<HTMLSelectElement>) {
    this.props.startInterval.to = parseInt(formEvent.currentTarget.value, 10)
  }

  private resetInterval() {
    this.props.startInterval.from = TimeInterval.defaultFrom
    this.props.startInterval.to = TimeInterval.defaultTo
  }

  public render() {
    return (
      <div className="form-inline mb-3">
        <label className="mr-3">Starter:</label>
        <select
          className="custom-select"
          onChange={e => this.handleChangeFrom(e)}
          value={this.props.startInterval.from}
        >
          {integerArray(0, 23).map(n =>
            <option>{n}</option>
          )}
        </select>
        <label className="ml-2 mr-2">-</label>
        <select
          className="custom-select"
          onChange={e => this.handleChangeTo(e)}
          value={this.props.startInterval.to}
        >
          {integerArray(1, 24).map(n =>
            <option>{n}</option>
          )}
        </select>
          <button
            type="button"
            className="btn btn-secondary ml-3"
            onClick={() => this.resetInterval()}
          >
            Nulstil
          </button>
      </div>
    )
  }
}