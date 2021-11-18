import { useState, useEffect } from 'react';
import EstatesToCompare from './EstatesToCompare';
import ComparedEstates from './ComparedEstates';

function App() {
    const [estatesData, setEstatesData] = useState([]);
    const [photoScrollStart, setPhotoScrollStart] = useState(-1);
    const [photosDisplay, setPhotosDisplay] = useState([]);
    const [comparedEstatesIds, setComparedEstatesIds] = useState([]);
    const [comparedEstatesInfo, setComparedEstatesInfo] = useState([]);
    const [noEstatesToCompare, setNoEstatesToCompare] = useState(0);

    const estatesUrl = 'https://estate-comparison.codeboot.cz/list.php';

    async function fetchEstateData() {
        const response = await fetch(estatesUrl);
        const results = await response.json();
        setEstatesData(results);
        setPhotoScrollStart(0);
    }

    useEffect(() => {
        fetchEstateData();
    }, []);

    // to scroll photos

    const scrollPhotos = () => {
        if (
            photoScrollStart >= 0 &&
            photoScrollStart + 8 <= estatesData.length
        ) {
            setPhotosDisplay([]);

            const endPoint = photoScrollStart + 8;
            let count = photoScrollStart;
            let newDisplay = [];

            while (count < endPoint) {
                newDisplay.push(estatesData[count]);
                count++;
            }
            setPhotosDisplay(newDisplay);
        }
    };

    useEffect(() => {
        scrollPhotos();
    }, [photoScrollStart]);

    // to chose estates to compare - how to map estatesData and filter for chosen estates
    // so the order matches?

    const getChosenEstatesInfo = () => {
        let estates = [];
        comparedEstatesIds.map((estateId, i) => {
            estates[i] = estatesData.filter((estate) => {
                return estate.id === estateId;
            })[0];
        });
        setComparedEstatesInfo(estates);
    };

    useEffect(() => {
        getChosenEstatesInfo();
    }, [noEstatesToCompare]);

    return (
        <div className="estate-compare__container">
            <h2 className="estate-compare__main-title">Estate Comparison</h2>
            {photosDisplay.length === 8 && (
                <EstatesToCompare
                    photosDisplay={photosDisplay}
                    photoScrollStart={photoScrollStart}
                    setPhotoScrollStart={setPhotoScrollStart}
                    estateDataLength={estatesData.length}
                    setComparedEstatesIds={setComparedEstatesIds}
                    comparedEstatesIds={comparedEstatesIds}
                    noEstatesToCompare={noEstatesToCompare}
                    setNoEstatesToCompare={setNoEstatesToCompare}
                />
            )}
            <ComparedEstates comparedEstatesInfo={comparedEstatesInfo} />
        </div>
    );
}
export default App;
