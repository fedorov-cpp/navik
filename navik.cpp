#include <iostream>
#include <unistd.h>
#include <vector>
#include <variant>

struct IProperty {
  public:
    virtual ~IProperty() = default;
    [[nodiscard]] virtual std::string json_str() const = 0;
};

class WindAngle : public IProperty {
  public:
    [[nodiscard]] std::string json_str() const override {
      const double angle = get();
      return R"({"prop":"windAngle", "data":)" + std::to_string(angle) + "}";
    }

  private:
    static double get() {
      static double angle = 0.;
      angle += 5.;
      if (angle > 359.) {
        angle = 0.;
      }
      return angle;
    }
};

class WindSpeed : public IProperty {
  public:
    [[nodiscard]] std::string json_str() const override {
      const double speed = get();
      return R"({"prop":"windSpeed", "data":)" + std::to_string(speed) + "}";
    }

  private:
    static double get() {
      static double speed = 0.;
      speed += 1.;
      if (speed > 15.) {
        speed = 0.;
      }
      return speed;
    }
};

class Depth : public IProperty {
  public:
    [[nodiscard]] std::string json_str() const override {
      const double depth = get();
      return R"({"prop":"depth", "data":)" + std::to_string(depth) + "}";
    }

  private:
    static double get() {
      static double depth = 0.;
      depth += 0.1;
      if (depth > 5.) {
        depth = 3.;
      }
      return depth;
    }
};

class SogCog : public IProperty {
  public:
    [[nodiscard]] std::string json_str() const override {
      const double sog = getSog();
      const double cog = getCog();
      return R"({"prop":"sogCog", "data": {"sog":)" + std::to_string(sog) +
             R"(, "cog":)" + std::to_string(cog) + "}}";
    }

  private:
    static double getSog() {
      static double sog = 0.;
      sog += 1.1;
      if (sog > 12.) {
        sog = 0.;
      }
      return sog;
    }

    static double getCog() {
      static double cog = 0.;
      cog += 3.;
      if (cog > 180.) {
        cog = 0.;
      }
      return cog;
    }
};

class Coords : public IProperty {
  public:
    [[nodiscard]] std::string json_str() const override {
      return R"({"prop":"coord", "data":{"n":"55°45′20″", "e":"37°37′03″"}})";
    }
};

template<typename... Properties>
class Navik {
  public:
    Navik() {
      properties_ = {Properties {}...};
    }

    void send() {
      for (const auto &prop: properties_) {
        std::visit([](const auto &p) {
          const std::string msg = p.json_str();
          std::cout << msg << std::endl;
        }, prop);
      }
    }

  private:
    std::vector<std::variant<Properties...>> properties_;
};


int main() {
  // Disable input/output buffering.
  setbuf(stdout, nullptr);
  setbuf(stdin, nullptr);

  Navik<WindAngle, WindSpeed, Depth, SogCog, Coords> navik;

  while (true) {
    navik.send();
    sleep(1);
  }
}