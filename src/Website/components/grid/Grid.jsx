import React, {Component, PropTypes} from 'react'

class Grid extends Component {

    component(index) {
        return (
            <div className="component" key={index}>
                <div className="content row">
                    <div className="small-10 column">
                        <h5>NAME</h5>
                        <p>
                            Unternehmen besteht im
                        </p>
                        <p>
                            Herzen aus einem Team von
                            engagierten und kompetenten
                            Mitarbeitern. In guten Unternehm
                        </p>
                        <div className="buttons">
                            <span className="button"></span>
                            <span className="button"></span>
                        </div>
                    </div>
                </div>
            </div>
        )


    }
 
    components() {
        return Array.from({ length: 6 }, i => this.component(i))
    }

    renderGrid() {
        const style = { backgroundColor: '#ECECEC' }

        const grid = this.components().map((component, index) => {
            return (
                <div className="small-10 medium-10 large-4 column"  >
                    <div style={style}>
                        {component}
                    </div>
                </div >
            )
        })

        return grid
    }

    render() {
        return (
            <div className="row align-center grid">
                <div className="small-10 column">
                    <div className="row align-center">
                        {this.renderGrid.call(this)}
                    </div>
                </div>
            </div>
        )
    }
}

Grid.propTypes = {
    components: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string
}

export default Grid