import Videos from '../components/Videos';
import Box from '../components/Box'

const Explain = ({ items }) => {
    const boxs = items.map((box) => {
        const videos = box.items.map((vids, index) => {
            return <Videos key={index} items={vids} />
        });
        return <Box key={box.title} title={box.title} children={videos} />
    });
    return (
        <>
            {boxs}
        </>
    );
}

export default Explain;
