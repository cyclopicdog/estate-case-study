import { useState, useEffect } from 'react';
import Photos from './Photos';

export default function ComparedEstates({ comparedEstatesInfo }) {
    const [estatesForDisplay, setEstatesForDisplay] = useState([]);

    const createDisplayEstates = () => {
        const estates = [];
        // add the css classNames to the objects
        comparedEstatesInfo.map((estate, i) => {
            estates[i] = {
                ...estate,
                price_class_name: 'estate-compare__value',
                building_area_class_name: 'estate-compare__value',
                land_area_class_name: 'estate-compare__value',
            };
        });

        // loop the estates - outer loop each estate -
        // inner loop each estate - set worst values as class for display

        for (let i = 0; i < estates.length; i++) {
            for (let j = 0; j < estates.length; j++) {
                if (
                    parseInt(estates[i].prize_czk) >
                    parseInt(estates[j].prize_czk)
                ) {
                    estates[i].price_class_name =
                        'estate-compare__value estate-compare__value--worst';
                }
                if (
                    parseInt(estates[i].building_area) <
                    parseInt(estates[j].building_area)
                ) {
                    estates[i].building_area_class_name =
                        'estate-compare__value estate-compare__value--worst';
                }
                if (
                    parseInt(estates[i].land_area) <
                    parseInt(estates[j].land_area)
                ) {
                    estates[i].land_area_class_name =
                        'estate-compare__value estate-compare__value--worst';
                }
            }
        }
        setEstatesForDisplay(estates);
    };

    useEffect(() => {
        createDisplayEstates();
    }, [comparedEstatesInfo]);

    return (
        <div className="estate-compare__comparison-container">
            {estatesForDisplay.map((estate, i) => (
                <div className="estate-compare__compared-item" key={i} id={i}>
                    <Photos
                        photos={estate.images}
                        alt={`${estate.name_extracted}, ${estate.locality}`}
                    />

                    <p className="estate-compare__value estate-compare__value--higher">
                        {estate.name}
                    </p>
                    <p className={estate.price_class_name}>
                        <span className="estate-compare__value-tag estate-compare__value-tag--bold">
                            Price
                        </span>
                        <span className="estate-compare__value-tag">
                            {estate.prize_czk}
                        </span>
                    </p>
                    <p className="estate-compare__value estate-compare__value--higher">
                        <span className="estate-compare__value-tag estate-compare__value-tag--bold">
                            Locality
                        </span>
                        <span className="estate-compare__value-tag">
                            {estate.locality}
                        </span>
                    </p>

                    <p className={estate.building_area_class_name}>
                        <span className="estate-compare__value-tag estate-compare__value-tag--bold">
                            Building area
                        </span>
                        <span className="estate-compare__value-tag">
                            {estate.building_area}
                        </span>
                    </p>
                    <p className={estate.land_area_class_name}>
                        <span className="estate-compare__value-tag estate-compare__value-tag--bold">
                            Land area
                        </span>{' '}
                        <span className="estate-compare__value-tag">
                            {estate.land_area}
                        </span>
                    </p>
                    <p className="estate-compare__agency">
                        <img
                            className="estate-compare__logo"
                            src={estate.company_logo}
                            alt={estate.company_name}
                        />
                        <span>{estate.company_name}</span>
                    </p>
                </div>
            ))}
        </div>
    );
}
