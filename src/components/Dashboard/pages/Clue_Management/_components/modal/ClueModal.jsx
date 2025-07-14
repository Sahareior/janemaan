import React from 'react';
import { Modal, Input, Button } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './modal.css';

const { TextArea } = Input;

const ClueModal = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal p-5 sm:p-8"
      width="95%"
      style={{ maxWidth: '960px' }}
      title={
        <div>
          <h2 className="text-white popmed text-lg sm:text-xl md:text-2xl font-bold">
            Create New Clue
          </h2>
          <p className="text-gray-400 popreg text-sm sm:text-base">Design a clue for participants</p>
        </div>
      }
    >
      <div className="flex flex-col mt-6 gap-8">

        {/* City + Description + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col justify-between">
            <div>
              <label htmlFor="city" className="text-white block mb-1 popmed text-sm sm:text-base">Enter Clue Name</label>
              <Input
                id="city"
                placeholder="Enter Clue Name"
                className="mt-2"
                style={{
                  backgroundColor: '#030712',
                  color: 'white',
                  height: '70px',
                  paddingLeft: '16px'
                }}
              />
            </div>
            <div>
              <label htmlFor="desc1" className="text-white block mb-1 popmed text-sm sm:text-base">Enter Riddle or Puzzle</label>
              <TextArea
                id="desc1"
                placeholder="Enter Description"
                rows={7}
                className="resize-none mt-2"
                style={{
                  backgroundColor: '#030712',
                  color: 'white',
                  padding: '12px 16px'
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-white block mb-2 font-medium text-sm sm:text-base">Location</label>
            <div className="rounded-lg p-8 overflow-hidden border border-gray-700">
              <p className='text-slate-400 text-[17px] popreg'>📍 Johannesburg Expo Centre, Nasrec</p>
              <MapContainer center={[-33.9249, 18.4241]} zoom={13} scrollWheelZoom={false} className="h-[220px] w-full">
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-33.9249, 18.4241]}>
                  <Popup>Clue Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        {/* QR Code Details */}
        <div className="space-y-5">
          <h3 className="text-lg sm:text-xl font-semibold text-white">QR Code Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label htmlFor="lat" className="text-white block mb-1 popreg text-sm sm:text-base">Latitude</label>
                  <Input
                    id="lat"
                    placeholder="40.7128"
                    style={{ backgroundColor: '#030712', color: 'white', height: '50px' }}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="long" className="text-white block mb-1 popreg text-sm sm:text-base">Longitude</label>
                  <Input
                    id="long"
                    placeholder="-74.0060"
                    style={{ backgroundColor: '#030712', color: 'white', height: '50px' }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="id" className="text-white block mb-1 popreg text-sm sm:text-base">Clue ID</label>
                  <Input
                    id="id"
                    placeholder="Enter customized ID"
                    style={{ backgroundColor: '#030712', color: 'white', height: '50px', paddingLeft: '16px' }}
                  />
                </div>
                <div>
                  <label htmlFor="expiry" className="text-white block mb-1 popreg text-sm sm:text-base">Expires On</label>
                  <Input
                    id="expiry"
                    placeholder="Enter expiry date"
                    style={{ backgroundColor: '#030712', color: 'white', height: '50px', paddingLeft: '16px' }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="desc2" className="text-white block mb-2 popmed text-sm sm:text-base">Hints</label>
              <TextArea
                id="desc2"
                placeholder="Enter hints or notes"
                rows={5}
                className="resize-none"
                style={{
                  backgroundColor: '#030712',
                  color: 'white',
                  padding: '12px 16px'
                }}
              />
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Button className="bg-[#2C739E] text-white w-full sm:w-[135px] h-[50px]">Create Clue</Button>
                <Button className="w-full sm:w-[135px] h-[50px] bg-black text-white">Cancel</Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default ClueModal;
