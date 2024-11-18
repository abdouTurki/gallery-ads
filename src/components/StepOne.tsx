import React from 'react';
import { FormikProps } from 'formik';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

interface StepOneProps {
    formik: FormikProps<any>;
}

const StepOne: React.FC<StepOneProps> = ({ formik }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Campaign Information</h2>
            <div className="space-y-4">
                {/* Brand Name */}
                <div>
                    <label className="block font-medium">Brand Name</label>
                    <Input
                        type="text"
                        name="brandName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.brandName}
                    />
                    {formik.touched.brandName && formik.errors.brandName ? (
                        <p className="text-red-500 text-sm">{formik.errors.brandName}</p>
                    ) : null}
                </div>
                {/* Brand Website */}
                <div>
                    <label className="block font-medium">Brand Website</label>
                    <Input
                        type="text"
                        name="brandWebsite"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.brandWebsite}
                    />
                    {formik.touched.brandWebsite && formik.errors.brandWebsite ? (
                        <p className="text-red-500 text-sm">{formik.errors.brandWebsite}</p>
                    ) : null}
                </div>
                {/* Campaign Name */}
                <div>
                    <label className="block font-medium">Campaign Name</label>
                    <Input
                        type="text"
                        name="campaignName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.campaignName}
                    />
                    {formik.touched.campaignName && formik.errors.campaignName ? (
                        <p className="text-red-500 text-sm">{formik.errors.campaignName}</p>
                    ) : null}
                </div>
                {/* Campaign Goal */}
                <div>
                    <label className="block font-medium">Campaign Goal</label>
                    <Select
                        name="campaignGoal"
                        value={formik.values.campaignGoal}
                        onValueChange={(value) => formik.setFieldValue('campaignGoal', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a goal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Maximize Conversions">Maximize Conversions</SelectItem>
                            <SelectItem value="Awareness">Awareness</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Creative Brief */}
                <div>
                    <label className="block font-medium">Creative Brief</label>
                    <Textarea
                        name="creativeBrief"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.creativeBrief}
                    />
                    {formik.touched.creativeBrief && formik.errors.creativeBrief ? (
                        <p className="text-red-500 text-sm">{formik.errors.creativeBrief}</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default StepOne;
