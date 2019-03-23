import React from "react"

import Event from "components/Event"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { shopping: "" }
    }

    componentDidMount() {
        fetch("https://storage.googleapis.com/dito-questions/events.json")
            .then((response) => response.json())
            .then((json) => {
                this.setState({ shopping: this.formatInformation(JSON.stringify(json)) })
            })
    }

    formatInformation(response) {
        if (!Boolean(response)) return []

        const data = JSON.parse(response)

        data.events
            .sort((a, b) => {
                if (a.timestamp < b.timestamp) return -1
                if (a.timestamp > b.timestamp) return +1
                return 0
            })

        const shopping = data.events
            .filter(e => e.event === "comprou")
            .map(e => {
                return {
                    products: [],
                    revenue: e.revenue,
                    store_name: e.custom_data.find(d => d.key === "store_name").value,
                    timestamp: new Date(e.timestamp),
                    transaction_id: e.custom_data.find(d => d.key === "transaction_id").value,
                }
            })

        data.events
            .filter(e => e.event === "comprou-produto")
            .forEach(e => {
                shopping
                    .find(s => s.transaction_id === e.custom_data.find(d => d.key === "transaction_id").value)
                    .products.push({
                        product_name: e.custom_data.find(d => d.key === "product_name").value,
                        product_price: e.custom_data.find(d => d.key === "product_price").value,
                    })
            })

        return shopping
    }

    render() {
        const shopping = this.state.shopping

        return (
            <div>
                {shopping && shopping.map((event, index) =>
                    <Event event={event} key={index} />
                )}
            </div>
        )
    }
}

export default App