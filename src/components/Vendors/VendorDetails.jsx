import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocument, updateDocument } from '../../firebase/firestore';

export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchVendor = async () => {
      const docSnap = await getDocument('vendors', id);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        setVendor(data);
        setFormData(data);
      }
      setLoading(false);
    };
    fetchVendor();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDocument('vendors', id, formData);
    navigate('/vendors');
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Vendor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows="3"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Tax ID</label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/vendors')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Vendor
          </button>
        </div>
      </form>
    </div>
  );
}