<?php

namespace App\Http\Controllers;

use App\Models\ProjectProduct;
use App\Models\UltraDevice;
use Illuminate\Http\Request;

class SensorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $device = ProjectProduct::where("device_number", $request->device_number)->first();
        $ultraDevice = UltraDevice::where("device", $device->id);

        return response()->json(['data' => $ultraDevice], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $device = ProjectProduct::where('device_number', $request->device)->first();
        $ultraDevice = UltraDevice::where('device', $device->id)->first();

        //$device = UltraDevice::where("device", $request->device);
        if(!$ultraDevice) {
            UltraDevice::create([
                'device' => $device->id,
                'is_active' => $request->is_active,
                'sensor_delay' => $request->sensor_delay
            ]);
            return response()->json(['message' => "İşlem balarılı"], 201);
        }
        UltraDevice::destroy($ultraDevice->id);
        UltraDevice::create([
            'device' => $device->id,
            'is_active' => $request->is_active,
            'sensor_delay' => $request->sensor_delay
        ]);
        return response()->json(['message' => "İşlem balarılı"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
