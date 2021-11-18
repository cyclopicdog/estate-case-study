export default function EstatesToCompare({
    photosDisplay,
    photoScrollStart,
    setPhotoScrollStart,
    estateDataLength,
    comparedEstatesIds,
    setComparedEstatesIds,
    noEstatesToCompare,
    setNoEstatesToCompare,
}) {
    const moveRight = () => {
        photoScrollStart + 8 < estateDataLength &&
            setPhotoScrollStart(photoScrollStart + 1);
    };

    const moveLeft = () => {
        photoScrollStart > 0 && setPhotoScrollStart(photoScrollStart - 1);
    };

    const toggleCompare = (id) => {
        let newComparedEstates = comparedEstatesIds;

        if (newComparedEstates.indexOf(id) === -1) {
            newComparedEstates.push(id);
            setNoEstatesToCompare(noEstatesToCompare + 1);
        } else {
            newComparedEstates.splice(newComparedEstates.indexOf(id), 1);
        }
        setComparedEstatesIds(newComparedEstates);
        setNoEstatesToCompare(noEstatesToCompare - 1);
    };

    return (
        <header className="estate-compare__list-container">
            <div
                className={
                    photoScrollStart === 0
                        ? 'estate-compare__scroll estate-compare__scroll--off'
                        : 'estate-compare__scroll'
                }
                onClick={moveLeft}
            >
                left
            </div>
            {photosDisplay.map((estate, i) => (
                <div
                    className={
                        !comparedEstatesIds.includes(estate.id)
                            ? 'estate-compare__list-item'
                            : 'estate-compare__list-item estate-compare__list-item--selected'
                    }
                    key={i}
                    id={estate.id}
                    onClick={() => toggleCompare(estate.id)}
                >
                    <img
                        className="estate-compare__photo"
                        src={estate.images[0]}
                        alt={`${estate.name_extracted}, ${estate.locality}`}
                    />
                    <p className="estate-compare__label">{`${estate.name_extracted}, ${estate.locality}`}</p>
                </div>
            ))}
            <div
                className={
                    photoScrollStart + 8 === estateDataLength
                        ? 'estate-compare__scroll estate-compare__scroll--off'
                        : 'estate-compare__scroll'
                }
                onClick={moveRight}
            >
                right
            </div>
        </header>
    );
}
