package host.exp.stripeexample;

import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactPackage;
import com.gettipsi.stripe.StripeReactPackage;

import java.util.Arrays;
import java.util.List;

// Needed for `react-native link`
import com.facebook.react.ReactApplication;
import com.facebook.react.shell.MainReactPackage;

public class MainApplication extends MultiDexApplication {

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add cool native modules

        // Needed for `react-native link`
            new StripeReactPackage()
    );
  }
}
