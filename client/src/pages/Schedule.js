import Schedules from '../components/Schedules';
import Box from '../components/Box'

const Schedule = ({ items }) => {
    const boxs = items.map((box) => {
        const schedules = box.pdf.map((vids, index) => {
            return <Schedules key={index} items={vids} />
        });
        return <Box key={box.title} title={box.title} children={schedules} />
    });
    return (
        <>
            {boxs}
        </>
    );
}

export default Schedule;
