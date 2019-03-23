import React from "react"

import * as Calendar from "services/Calendar"

import Icons from "icons"

class Event extends React.Component {
    constructor(props) {
        super(props)
        this.state = { event: props.event }
    }

    render() {
        const event = this.state.event

        return (
            <div className="event">
                <div className="left">
                    <div>
                        <img alt="money" src={Icons.Check} height="30" />
                        <img alt="money" className="arrow" src={Icons.Triangle} height="20" />
                    </div>
                </div>

                <div className="right">
                    <table cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <th><img alt="calendar" src={Icons.Calendar} height="12" />{Calendar.formatDMY(event.timestamp)}</th>
                                <th><img alt="clock" src={Icons.Clock} height="12" />{event.timestamp.toString().slice(16, 21)}</th>
                                <th><img alt="place" src={Icons.Place} height="16" />{event.store_name}</th>
                                <th><img alt="money" src={Icons.Money} height="14" />R$ {event.revenue},00</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="bold" colSpan="3">Produto</th>
                                <th className="bold">Preço</th>
                            </tr>
                            {event.products.map((product, index) =>
                                <tr key={index}>
                                    <th colSpan="3">{product.product_name}</th>
                                    <th>R$ {product.product_price},00</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Event