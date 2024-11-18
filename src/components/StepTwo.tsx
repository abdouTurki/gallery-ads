import React from 'react';
import { FormikProps } from 'formik';
import { Checkbox } from '@components/ui/checkbox';

interface MediaItem {
    id: string;
    type: 'image' | 'video';
    src: string;
}

interface StepTwoProps {
    formik: FormikProps<any>;
}

const mediaItems: MediaItem[] = [
    { id: '1', type: 'image', src: 'https://via.placeholder.com/150' },
    { id: '2', type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // Add more media items
];

const StepTwo: React.FC<StepTwoProps> = ({ formik }) => {
    const toggleMediaSelection = (id: string) => {
        let selectedMedia = [...formik.values.selectedMedia];
        if (selectedMedia.includes(id)) {
            selectedMedia = selectedMedia.filter((mediaId) => mediaId !== id);
        } else {
            selectedMedia.push(id);
        }
        formik.setFieldValue('selectedMedia', selectedMedia);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Select Media Assets</h2>
            {formik.errors.selectedMedia && formik.touched.selectedMedia ? (
                <p className="text-red-500 text-sm mb-2">{formik.errors.selectedMedia}</p>
            ) : null}
            <div className="grid grid-cols-3 gap-4">
                {mediaItems.map((media) => (
                    <div
                        key={media.id}
                        className={`border rounded p-2 cursor-pointer ${
                            formik.values.selectedMedia.includes(media.id) ? 'border-blue-500' : ''
                        }`}
                        onClick={() => toggleMediaSelection(media.id)}
                    >
                        <div className="relative">
                            <Checkbox
                                checked={formik.values.selectedMedia.includes(media.id)}
                                onCheckedChange={() => toggleMediaSelection(media.id)}
                                className="absolute top-2 right-2"
                            />
                            {media.type === 'image' ? (
                                <img src={media.src} alt="Media" className="w-full h-32 object-cover rounded" />
                            ) : (
                                <video src={media.src} className="w-full h-32 object-cover rounded" controls />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepTwo;
