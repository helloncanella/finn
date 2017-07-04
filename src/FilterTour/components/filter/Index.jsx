import createContainer from './create-container-mock.js'
import data from './fake-data/index.js'
import Filter from './Filter.jsx'

let lists = itemizeData()

export default createContainer(function (props) {
    const { categories, subcategories, resources } = lists

    return {
        data: {
            categories: { list: () => categories, multipleSelection: false },
            subcategories: { list: getItemsFunction(subcategories), multipleSelection: true },
            resources: { list: getItemsFunction(resources) }
        },
        toggleItem,
        unmarkAllCollection,
        restartData: cleanData
    }

}, Filter)

function unmarkIfNecessary(item) {
    if (item.marked) item.marked = false
}

function cleanData() {
    for (let collection in lists) {
        lists[collection].forEach(unmarkIfNecessary)
    }
}

function getItemsFunction(collection) {
    return (tag) => collection.filter(item => item.tag === tag)
}

function toggleItem({ itemName, collection }) {
    lists[collection].forEach(item => {
        if (item.primaryText == itemName) item.marked = !item.marked
    })
}

function unmarkAllCollection(collection) {
    lists[collection].forEach(item => item.marked = false)
}


function itemizeData() {
    let { categories, subcategories, resources } = data

    categories = itemizeCategories(categories)
    subcategories = itemizeSubcategories(subcategories)
    resources = itemizeResources(resources)

    return { categories, subcategories, resources }
}


function itemizeCategories(categories) {
    return categories.map(category => {
        return {
            primaryText: category,
            marked: false
        }
    })
}

function itemizeSubcategories(subcategories) {
    return subcategories.map(subcategory => {
        return {
            primaryText: subcategory.name,
            tag: subcategory.category,
            marked: false
        }
    })
}

function itemizeResources(resources) {
    return resources.map(resource => {
        return {
            primaryText: resource.name,
            secondaryText: resource.company,
            tag: resource.subcategory,
            marked: false
        }
    })
}