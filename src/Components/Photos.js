import { useState } from 'react';

export default function Photos({ photos, alt }) {
    const [imageValue, setImageValue] = useState(0);

    return (
        <>
            <img
                className="estate-compare__photo"
                src={photos[imageValue]}
                alt={alt}
                onClick={() =>
                    imageValue < photos.length - 1
                        ? setImageValue(imageValue + 1)
                        : setImageValue(0)
                }
            />
        </>
    );
}
