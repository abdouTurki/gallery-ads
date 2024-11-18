import React from 'react';
import { FormikProps } from 'formik';
import { Button } from '@shadcn/ui/button';

interface MediaItem {
    id: string;
    type: 'image' | 'video';
    src: string;
}

interface StepThreeProps {
    formik: FormikProps<any>;
}

const mediaItems: MediaItem[] = [
    { id: '1', type: 'image', src: 'https://via.placeholder.com/150' },
    { id: '2', type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // Add more media items
];

const StepThree: React.FC<StepThreeProps> = ({ formik }) => {
    const selectedMediaItems = mediaItems.filter((media) =>
        formik.values.selectedMedia.includes(media.id)
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Review and Submit</h2>
            {/* Campaign Information */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Campaign Information</h3>
                <p>
                    <strong>Brand Name:</strong> {formik.values.brandName}
                </p>
                <p>
                    <strong>Brand Website:</strong> {formik.values.brandWebsite}
                </p>
                <p>
                    <strong>Campaign Name:</strong> {formik.values.campaignName}
                </p>
                <p>
                    <strong>Campaign Goal:</strong> {formik.values.campaignGoal}
                </p>
                <p>
                    <strong>Creative Brief:</strong> {formik.values.creativeBrief}
                </p>
            </div>
            {/* Selected Media Assets */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Selected Media Assets</h3>
                <div className="grid grid-cols-3 gap-4">
                    {selectedMediaItems.map((media) => (
                        <div key={media.id} className="border rounded p-2">
                            {media.type === 'image' ? (
                                <img src={media.src} alt="Media" className="w-full h-32 object-cover rounded" />
                            ) : (
                                <video src={media.src} className="w-full h-32 object-cover rounded" controls />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepThree;
