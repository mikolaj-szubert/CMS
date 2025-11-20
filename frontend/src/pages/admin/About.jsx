import React, {useState, useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';
export default function AdminAbout() {
    const [saving, setSaving] = useState(false);
    const [initialData, setInitialData] = {
        title: 'Nasza Historia',
        aboutSrc: '/images/about-pic-primary.jpg',
        aboutSrcSet: '/images/about-pic-primary.jpg 1x, /images/about-pic-primary@2x.jpg 2x',
        paragraphs: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi earum, ut consequuntur pariatur fugiat aliquam voluptatem officia blanditiis ipsa laboriosam ad velit voluptate nisi saepe quisquam minima culpa eaque amet.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi earum, ut consequuntur pariatur fugiat aliquam voluptatem officia blanditiis ipsa laboriosam ad velit voluptate nisi saepe quisquam minima culpa eaque amet.',
        ],
    };
    const [data, setData] = useState({
        title: 'Nasza Historia',
        aboutSrc: '/images/about-pic-primary.jpg',
        aboutSrcSet: '/images/about-pic-primary.jpg 1x, /images/about-pic-primary@2x.jpg 2x',
        paragraphs: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi earum, ut consequuntur pariatur fugiat aliquam voluptatem officia blanditiis ipsa laboriosam ad velit voluptate nisi saepe quisquam minima culpa eaque amet.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi earum, ut consequuntur pariatur fugiat aliquam voluptatem officia blanditiis ipsa laboriosam ad velit voluptate nisi saepe quisquam minima culpa eaque amet.',
        ],
    });
    const { setIsDirty } = useOutletContext();
    useEffect(() => {
        const changed = !isEqual(data, initialData);
        setIsDirty(changed);
    }, [data, initialData, setIsDirty]);
    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <h2>O nas</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Tytuł</label>
                    <input type="text" value={data.title} onChange={onChange} id="title" name="title" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Paragrafy:</label>
                    {data.paragraphs.map((para, index) => (
                        <textarea key={index} className="form-control" style={{width: '100%', backgroundColor: '#1e1e1e', color: '#aaa', borderRadius: '5px', padding: '10px', marginBottom: '1vh'}} name={`paragraph-${index}`} value={para} onChange={(e) => {
                            const newParagraphs = [...data.paragraphs];
                            newParagraphs[index] = e.target.value;
                            setData({...data, paragraphs: newParagraphs});
                        }} />
                    ))}
                    <button type="button" className="btn btn--secondary" style={{width: '100%', marginBottom: '0'}} onClick={() => setData({...data, paragraphs: [...data.paragraphs, '']} )}>Dodaj paragraf</button>
                </div>
                <button type="submit" className={`btn btn--primary ${saving ? 'disabled' : ''}`} style={{width: '100%'}} disabled={saving} onClick={() => setSaving(!saving)}>Zapisz zmiany</button>
                {saving && <p>Zapisywanie...</p>}
            </form>
        </div>
    );
}