import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class TravelRouteFinder {
    private static Map<String, PriorityQueue<String>> graph = new HashMap<>();
    private static List<String> route = new ArrayList<>();

    public static List<String> findRoute(String[] tickets) {
        // Build the graph
        for (String ticket : tickets) {
            String[] parts = ticket.split("-");
            String departure = parts[0];
            String arrival = parts[1];

            graph.putIfAbsent(departure, new PriorityQueue<>());
            graph.get(departure).offer(arrival);
        }

        // Start DFS from Kiev
        dfs("Kiev");

        // Reverse the route to get the correct order
        Collections.reverse(route);

        return route;
    }

    private static void dfs(String city) {
        if (graph.containsKey(city)) {
            PriorityQueue<String> destinations = graph.get(city);
            while (!destinations.isEmpty()) {
                String nextCity = destinations.poll();
                dfs(nextCity);
            }
        }
        route.add(city);
    }

    public static void main(String[] args) {
        String[] tickets = {
                "Paris-Skopje", "Zurich-Amsterdam", "Prague-Zurich", "Barcelona-Berlin",
                "Kiev-Prague", "Skopje-Paris", "Amsterdam-Barcelona", "Berlin-Kiev", "Berlin-Amsterdam"
        };

        List<String> route = findRoute(tickets);

        System.out.println("Route traveled by your son:");
        System.out.println(String.join(" -> ", route));
    }
}
