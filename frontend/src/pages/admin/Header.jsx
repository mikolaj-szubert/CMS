import React, {useState, useEffect} from 'react';

export default function AdminHeader() {
    const [data, setData] = useState({
        phoneNumber: '555-123-3456',
        menuLabel: 'Menu',
        introLabel: 'Wstęp',
        aboutLabel: 'O nas',
        galleryLabel: 'Galeria',
    });
    const [checked, setChecked] = useState(data.phoneNumber ? true : false);
    const [saving, setSaving] = useState(false);
    const change = (e) => {
        setData({...data, [e.target.name]: e.target.value});
        if (e.target.name === 'phoneNumber' && e.target.value) {
            setChecked(true);
        }
        else if (e.target.name === 'phoneNumber' && !e.target.value) {
            setChecked(false);
        }
    };
    const checkboxChange = (e) => setChecked(e.target.checked);
    return (
        <div>
            <h2>Nagłówek strony</h2>
            <form>
                <div className="form-group">
                    <label style={{ display: 'inline', width: 'auto', paddingInlineEnd: '10px'}} htmlFor="checkbox-phone-number">Wyświetlać numer telefonu?</label>
                    <input type="checkbox" style={{ width: 'auto' }} checked={checked} onChange={checkboxChange} id="checkbox-phone-number" name="checkbox-phone-number" className="form-control" />
                    <label htmlFor="tel-phone-number">Numer telefonu:</label>
                    <input type="tel" id="tel-phone-number" name="phoneNumber" className="form-control" value={data.phoneNumber} onChange={change} disabled={!checked} />
                </div>
                <div className="form-group">
                    <label>Tytuły etykiet menu:</label>
                    <input type="text" id="menu-label" name="menuLabel" className="form-control" value={data.menuLabel} onChange={change} />
                    <input type="text" id="intro-label" name="introLabel" className="form-control" value={data.introLabel} onChange={change} />
                    <input type="text" id="about-label" name="aboutLabel" className="form-control" value={data.aboutLabel} onChange={change} />
                    <input type="text" id="gallery-label" name="galleryLabel" className="form-control" value={data.galleryLabel} onChange={change} />
                </div>
                <button type="submit" className={`btn btn--primary ${saving ? 'disabled' : ''}`} disabled={saving} onClick={() => setSaving(!saving)}>Zapisz zmiany</button>
                {saving && <p>Zapisywanie...</p>}
            </form>
        </div>
    );
}