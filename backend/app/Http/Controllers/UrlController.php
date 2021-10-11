<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class UrlController extends Controller
{
    private $status = 200;

    // Store Url function
    public function store(Request $request)
    {
        // validate inputs
        $validator = Validator::make($request->all(),
            [
                "url" => "required",
            ]
        );

         // create curl resource
         $curl = curl_init();

         curl_setopt_array($curl, array(
             CURLOPT_URL => $request->url,
             CURLOPT_RETURNTRANSFER => true,
             CURLOPT_ENCODING => "",
             CURLOPT_MAXREDIRS => 10,
             CURLOPT_TIMEOUT => 0,
             CURLOPT_FOLLOWLOCATION => true,
             CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
             CURLOPT_CUSTOMREQUEST => "GET",
         ));
 
         $response = curl_exec($curl);
 
         $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
 
         curl_close($curl);

        // if validation fails
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
        }

        $urlArray = array(
            "id" => $request->id,
            "url" => $request->url,
            "status_code" => $http_code,
        );

        $url = Url::create($urlArray);
        if (!is_null($url)) {
            return response()->json(["status" => $this->status, "success" => true, "message" => "url record created successfully", "data" => $url]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! failed to create."]);
        }
    }

    // Urls Index
    public function index()
    {
        $urls = Url::all();
        if (count($urls) > 0) {
            return response()->json(["status" => $this->status, "success" => true, "count" => count($urls), "data" => $urls]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Opa! nenhuma gravação encontrada"]);
        }
    }

    // Url Show
    public function show($id)
    {
        $url = Url::find($id);
        if (!is_null($url)) {
            return response()->json(["status" => $this->status, "success" => true, "data" => $url]);
        } else {
            return response()->json([
                "status" => "failed",
                "success" => false,
                "message" => "Whoops! no url found",
            ]);
        }
    }

    // Ulr update
    public function update(Request $request, Url $url)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'url' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $url->url = $input['url'];
        $url->save();
        return response()->json([
            "success" => true,
            "message" => "Url updated successfully.",
            "data" => $url,
        ]);
    }

    // Delete Url
    public function destroy($id)
    {
        $url = Url::find($id);
        if (!is_null($url)) {
            $delete_status = Url::where("id", $id)->delete();
            if ($delete_status == 1) {
                return response()->json(["status" => $this->status, "success" => true, "message" => "url record deleted successfully"]);
            } else {
                return response()->json(["status" => "failed", "message" => "failed to delete, please try again"]);
            }
        } else {
            return response()->json(["status" => "failed", "message" => "Whoops! no url found with this id"]);
        }
    }
}
