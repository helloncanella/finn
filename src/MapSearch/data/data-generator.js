const faker = require('faker/locale/de')
const jsonfile = require('jsonfile')

// Frankfurt Bounds
const west = 8.656059927814454
    , east = 8.698975272052735

const north = 50.11986489442692
    , south = 50.09784654073315

const companies = []
    , quantity = 200


for (let i = 1; i <= quantity; i++) {

    const data = {
        _id: faker.random.uuid(),
        meta: {
            role: ['Anbieter', 'Berater'][Math.round(Math.random())],
        },
        profile: {
            contact: {
                title: faker.name.jobTitle(),
                name: faker.name.findName(),
                image: {
                    path: 'https://unsplash.it/400/300?image=' + i % 1084
                },
                latlong: {
                    long: west + (east - west) * Math.random(),
                    lat: south + (north - south) * Math.random()
                }
            },
            about: {
                logo: {
                    path: 'https://unsplash.it/400/300?image=' + i % 1084
                },
            },
            services: {
                list: ["pt", "mb"],
            }
        }

    }

    companies.push(data)

    jsonfile.writeFile('./companies-fake-data.json', companies, { spaces: 4 }, (error) => {
        if (error) console.log(error)
    })


}





