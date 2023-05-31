let eventNumber = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '')
export const initialValues = [
    /* {
        id: createEventId(),
        title: 'exampleEvent',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'exampleEvent',
        start: todayStr+'T12:00:00'
    }, */

]
export function createEventId(){
    return String(eventNumber++)
}