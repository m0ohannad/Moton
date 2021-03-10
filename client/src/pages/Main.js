import Books from '../components/Books';
import Audios from '../components/Audios';

const Main = ({ books, audios }) => {
    return (
        <>
            <Books title="قراءة الكتب" items={books} />
            <Audios title="الاستماع للكتب" items={audios} />

        </>
    );
}

export default Main;
