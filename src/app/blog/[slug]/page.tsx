import React from 'react'


interface PageProps {
    params: {
        slug: string;
    };
}

const page = async (props: PageProps) => {
    const params = await props.params;
    const { slug } = params;
    return (
        <div>page = {slug}</div>
    );
}

export default page