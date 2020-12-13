import * as fs from 'fs'
import * as OSPoint from "ospoint"

const file = fs.readFileSync('./rawdata/PostalDistrict.json')
for (const line of file.toString().split(/\n/)) {
    try {
        const json = JSON.parse(line.replace(/\s*,\s*$/g, ''))

        const { geometry } = json

        for (const i in geometry.coordinates) {
            const coordinate = geometry.coordinates[i]
            for (const j in coordinate) {
                const point = coordinate[j]
                if (point.length === 2 && typeof(point[0]) === "number") {
                    const easting = point[0]
                    const northing = point[1]
                    const latLng = new OSPoint(northing, easting).toWGS84()
                    point[0] = latLng.longitude
                    point[1] = latLng.latitude
                } else {
                    for (const k in point) {
                        const subpoint = point[k]
                        const easting = subpoint[0]
                        const northing = subpoint[1]
                        const latLng = new OSPoint(northing, easting).toWGS84()
                        subpoint[0] = latLng.longitude
                        subpoint[1] = latLng.latitude
                        point[k] = subpoint
                    }
                }
                coordinate[j] = point
            }
            geometry.coordinates[i] = coordinate

            json.geometry = geometry
            const data = JSON.stringify(json, null, 2)
            const filename = `./output/${json.properties.PostDist}.json`
            fs.writeFileSync(filename, data) 

        }


    } catch (e) {
        console.log(e)
    }
}  