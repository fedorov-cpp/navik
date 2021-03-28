#include <iostream>
#include <cstdio>
#include <sstream>
#include <unistd.h>


using namespace std;


void sendResp(string msg)
{
    cout << "^BEG^"+msg+"$END$" << endl;
}

void changeWindAngle(float *angle)
{
    *angle += 15;
    if(*angle > 359)
        *angle=0;
}
void changeWindSpeed(float *speed)
{
    *speed += 1.5;
    if(*speed > 15)
        *speed=0;
}
void changeDepth(float *depth)
{
    *depth += 0.1;
    if(*depth > 5)
        *depth=3;
}
void changeSogCog(float *sog, float *cog)
{
    *sog += 1.1;
    if(*sog > 12)
        *sog=0;
    *cog += 3;
    if(*cog > 180)
        *cog=0;
}

int main() {
    // Disable input/output buffering.
    setbuf(stdout, NULL);
    setbuf(stdin, NULL);

    float windAngle = 0;
    float windSpeed = 0;
    float depth = 0;
    float sog = 0;
    float cog = 0;
    string coords="{\"n\":\"55°45′20″\", \"e\": \"37°37′03″\"}";
    string sogcog="";
    stringstream ss;
    while(true)
    {
        ss << windAngle;
        sendResp("{\"resp\":\"windAngle\", \"data\":"+ss.str()+"}");
        ss.str("");
        ss << windSpeed;
        sendResp("{\"resp\":\"windSpeed\", \"data\":"+ss.str()+"}");
        ss.str("");
        ss << depth;
        sendResp("{\"resp\":\"depth\", \"data\":"+ss.str()+"}");
        ss.str("");
        ss << sog;
        sogcog += "{\"sog\":"+ss.str()+", ";
        ss.str("");
        ss << cog;
        sogcog += "\"cog\":"+ss.str()+"}";
        ss.str("");
        sendResp("{\"resp\":\"sogcog\", \"data\":"+sogcog+"}");
        sogcog="";
        sendResp("{\"resp\":\"coord\", \"data\":"+coords+"}");
        changeWindAngle(&windAngle);
        changeWindSpeed(&windSpeed);
        changeDepth(&depth);
        changeSogCog(&sog, &cog);
        sleep(1);
    }
    return 0;
}